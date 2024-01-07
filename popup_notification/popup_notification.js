'use strict';

export class PopupNotification {
    static CLASS_BASE = 'popup_notification'
    static POSITION_BOTTOM_RIGHT = 'bottom_right'
    static POSITION_TOP = 'top'

    static activeElems = []

    static popup(type, message, options = {}) {
        const {
            position = PopupNotification.POSITION_BOTTOM_RIGHT,
            duration = 5000
        } = options

        const classNames = {
            container: `${PopupNotification.CLASS_BASE}-container`,
            window: `${PopupNotification.CLASS_BASE}-window`,
            icon: `${PopupNotification.CLASS_BASE}-icon`,
            message: `${PopupNotification.CLASS_BASE}-message`,
            closer: `${PopupNotification.CLASS_BASE}-closer`,
            show: `${PopupNotification.CLASS_BASE}-show`,
            remove: `${PopupNotification.CLASS_BASE}-remove`,
            type: `${PopupNotification.CLASS_BASE}-type-${type}`,
            position: `${PopupNotification.CLASS_BASE}-position-${position}`,
            action: `${PopupNotification.CLASS_BASE}-action`,
        }
        const elem = (() => {
            const elem = document.createElement('div')
            elem.classList.add(classNames.container)
            elem.classList.add(classNames.position)
            elem.classList.add(classNames.action)
            elem.classList.add(classNames.type)
            const html = `
                <div class="${classNames.window}">
                    <div style="display:flex; align-items:center;">
                        <div class="${classNames.icon}"></div>
                        <div class="${classNames.message}">${message}</div>
                    </div>
                    <div class="${classNames.closer}"></div>
                </div>
            `
            elem.insertAdjacentHTML('beforeend', html)
            return elem
        })()
        document.body.insertAdjacentElement('beforeend', elem)
        PopupNotification.pushOutActiveElems(elem, position)
        PopupNotification.activeElems.push(elem)

        const close = () => {
            elem.classList.remove(classNames.show)
            elem.classList.add(classNames.remove)
            PopupNotification.pullBackActiveElems(elem, position)
            elem.ontransitionend = () => {
                const idx = PopupNotification.activeElems.indexOf(elem)
                if (idx !== -1) PopupNotification.activeElems.slice(idx, 1)
                elem.remove()
            }
        }

        setTimeout(() => {
            elem.classList.add(classNames.show)
            const timeout = setTimeout(close, duration)
            const closerElems = Array.from(elem.querySelectorAll('.' + classNames.closer))
            closerElems.forEach(closerElem => {
                closerElem.onclick = () => {
                    clearTimeout(timeout)
                    close()
                }
            })
        }, 1)
    }

    static pushOutActiveElems(newElem, newElemPosition) {
        const extrusionHeight = newElem.offsetHeight
        const samePositionElems = Array.from(document.querySelectorAll(`.${PopupNotification.CLASS_BASE}-position-${newElemPosition}`))
        if (newElemPosition === PopupNotification.POSITION_BOTTOM_RIGHT) {
            samePositionElems.forEach(elem => {
                if (elem === newElem) return
                const samePositionElemHeight = parseFloat(elem.style.bottom || 0)
                elem.style.bottom = samePositionElemHeight + extrusionHeight + 'px'
            })
        } else if (newElemPosition === PopupNotification.POSITION_TOP) {
            samePositionElems.forEach(elem => {
                if (elem === newElem) return
                const samePositionElemHeight = parseFloat(elem.style.top || 0)
                elem.style.top = samePositionElemHeight + extrusionHeight + 'px'
            })
        }
    }

    static pullBackActiveElems(removeElem, removeElemPosition) {
        const extrusionHeight = removeElem.offsetHeight
        const samePositionElems = Array.from(document.querySelectorAll(`.${PopupNotification.CLASS_BASE}-position-${removeElemPosition}`))
        if (removeElemPosition === PopupNotification.POSITION_BOTTOM_RIGHT) {
            for (let i = 0; i < samePositionElems.length; i++) {
                const elem = samePositionElems[i]
                if (elem === removeElem) break;
                const samePositionElemHeight = parseFloat(elem.style.bottom || 0)
                elem.style.bottom = samePositionElemHeight - extrusionHeight + 'px'
            }
        } else if (removeElemPosition === PopupNotification.POSITION_TOP) {
            for (let i = 0; i < samePositionElems.length; i++) {
                const elem = samePositionElems[i]
                if (elem === removeElem) break;
                const samePositionElemHeight = parseFloat(elem.style.top || 0)
                elem.style.top = samePositionElemHeight - extrusionHeight + 'px'
            }
        }
    }
}
