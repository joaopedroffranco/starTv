import React from 'react';
import Plataform from 'startv/tv/plataform';
import Screen from './screen';
import Menu from './menu/menu';
import Animator from '../util/animator';

class Main extends Screen {
	constructor() {
		super();
        
        this.state = {
            menuIsOpened: true
        };
    }

    componentDidMount() {
        this.updateNavigation();
    }

    componentDidUpdate() {
        this.updateNavigation();
    }

	updateNavigation() {
        const { menuIsOpened } = this.state;
        if (menuIsOpened) {
            if (this.menuComponent) {
                Plataform.current.navigation.set(this.exit.bind(this), this.onExit);
                Plataform.current.navigation.setType(this.menuComponent.navigationType);
            }
        } else {
            const { content } = this.props;
            if (content) {
                Plataform.current.navigation.set(this.changeMenu.bind(this), this.onExit);
                Plataform.current.navigation.setType(content.navigationType);
            }
        }

        Plataform.current.navigation.focus();
    }

    changeMenu() {
        this.setState((prevState, props) => { return {
            menuIsOpened: !prevState.menuIsOpened
        }});
    }

    move(event) {
        const { menuIsOpened } = this.state;
        const { keyCode } = event;
        if (menuIsOpened && keyCode === Plataform.current.navigation.controls.right) {
            this.changeMenu();
        } else {
            if (Animator.canMove()) {
                super.move(event);
                const { scroll } = this.props;
                if (scroll) {
                    scroll(keyCode);
                }
            }
        }
    }
    
    exit() {
		Plataform.current.settings.exitApp();
	}

	render() {
        const { children, menuIndex } = this.props;
        const { menuIsOpened } = this.state;
		return (
			<div className="main-container">
                {menuIsOpened &&
                    <Menu
                        ref={(ref) => { this.menuComponent = ref; }}
                        updateNavigation={this.updateNavigation.bind(this)}
                        current={menuIndex}
                    />
                }
				{children}
			</div>
		);
	}
}

export default Main;
