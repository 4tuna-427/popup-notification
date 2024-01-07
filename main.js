'use strict';

import { PopupNotification } from './popup_notification/popup_notification.js'

setTimeout(() => {
    PopupNotification.popup('info', 'info message')
}, 0)

setTimeout(() => {
    PopupNotification.popup('info', 'info message', {
        position: PopupNotification.POSITION_TOP,
        duration: 100000
    })
}, 1000)

setTimeout(() => {
    PopupNotification.popup('info', 'info message', {
        duration: 100000
    })
    PopupNotification.popup('success', 'success message', {
        duration: 100000
    })
    PopupNotification.popup('error', 'error message', {
        duration: 100000
    })
    PopupNotification.popup('warning', 'warning message', {
        duration: 100000
    })
}, 2000)

setTimeout(() => {
    PopupNotification.popup('info', 'info message', {
        position: PopupNotification.POSITION_TOP,
        duration: 100000
    })
    PopupNotification.popup('success', 'success message', {
        position: PopupNotification.POSITION_TOP,
        duration: 100000
    })
    PopupNotification.popup('error', 'error message', {
        position: PopupNotification.POSITION_TOP,
        duration: 100000
    })
    PopupNotification.popup('warning', 'warning message', {
        position: PopupNotification.POSITION_TOP,
        duration: 100000
    })
}, 3000)
