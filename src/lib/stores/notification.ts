import { writable, type Writable } from "svelte/store";


export class NotificationState implements UI.INotificationState {
    autoCloseTimeout: number // milliseconds
    topLeftNts: Writable<Array<UI.INotification>>
    topCenterNts: Writable<Array<UI.INotification>>
    topRightNts: Writable<Array<UI.INotification>>
    bottomLeftNts: Writable<Array<UI.INotification>>
    bottomCenterNts: Writable<Array<UI.INotification>>
    bottomRightNts: Writable<Array<UI.INotification>>
    constructor(autoCloseTimeout: number) {
        this.autoCloseTimeout = autoCloseTimeout;
        this.topLeftNts = writable([]);
        this.topCenterNts = writable([]);
        this.topRightNts = writable([]);
        this.bottomLeftNts = writable([]);
        this.bottomCenterNts = writable([]);
        this.bottomRightNts = writable([]);

        //bind methods
        this.pushNotification = this.pushNotification.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
    }

    private getNts(position: UI.NotificationPoisition) {
        switch (position) {
            case 'top-left':
                return this.topLeftNts;
            case 'top-center':
                return this.topCenterNts;
            case 'top-right':
                return this.topRightNts;
            case 'bottom-left':
                return this.bottomLeftNts;
            case 'bottom-center':
                return this.bottomCenterNts;
            case 'bottom-right':
                return this.bottomRightNts;
        }
    }

    pushNotification(notification: UI.INotification) {
        const nts = this.getNts(notification.position);
        nts.update((nts) => [...nts, notification]);

        if (notification.autoClose !== false) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, notification.autoClose ?? this.autoCloseTimeout);
        }
    }

    removeNotification(notification: UI.INotification) {
        const nts = this.getNts(notification.position);
        nts.update((nts) => nts.filter((nt) => nt !== notification));
    }
}