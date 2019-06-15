/**
 * Custom Cursor
 *
 * Copyright 2019, Wendy Gao
 * https://github.com/wendygaoyuan/custom-cursor.git
 */

const body = document.body;
const getMousePos = e => {
    let posX = 0;
    let posY = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posX = e.pageX;
        posY = e.pageY;
    } else if (e.clientX || e.clientY) {
        posX = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
        posY = e.clientY + body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: posX, y: posY };
};

class Cursor {
    constructor(el) {
        this.cursorDot = el.querySelector('.cursor-dot');
        this.cursorCircle = el.querySelector('.cursor-circle');
        this.bounds = {
            dot: this.cursorDot.getBoundingClientRect(),
            circle: this.cursorCircle.getBoundingClientRect()
        };
        this.mousePos = { x: -100, y: -100 };
        this.easing = EaseLookup.find('backEaseInOut');

        this.initEvents();
        requestAnimationFrame(() => this.render());
    }
    initEvents() {
        window.addEventListener('mousemove', e => {
            this.mousePos = getMousePos(e);
        });
    }
    render() {
        TweenMax.to(this.cursorDot, 0.1, {
            x: this.mousePos.x - this.bounds.dot.width / 2,
            y: this.mousePos.y - this.bounds.dot.height / 2
        });

        TweenMax.to(this.cursorCircle, 0.3, {
            x: this.mousePos.x - this.bounds.circle.width / 2,
            y: this.mousePos.y - this.bounds.circle.height / 2
        });

        requestAnimationFrame(() => this.render());
    }
    mouseEnter() {
        TweenMax.to(this.cursorDot, 0.1, {
            display: 'none'
        });

        TweenMax.to(this.cursorCircle, 0.3, {
            ease: this.easing,
            scale: 1.5,
            backgroundColor: '#ffffff'
        });
    }
    mouseLeave() {
        TweenMax.to(this.cursorDot, 0.1, {
            display: ''
        });

        TweenMax.to(this.cursorCircle, 0.3, {
            ease: this.easing,
            scale: 1,
            backgroundColor: 'transparent'
        });
    }
}

window.onload = () => {
    const cursor = new Cursor(document.querySelector('.cursor'));
    const custom = document.getElementById('custom');

    custom.addEventListener('mouseenter', () => {
        cursor.mouseEnter();
    });
    custom.addEventListener('mouseleave', () => {
        cursor.mouseLeave();
    });
};
