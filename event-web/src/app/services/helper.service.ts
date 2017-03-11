import {Injectable} from '@angular/core';

@Injectable()
export class HelperService {
    constructor() {
    }

    redirect(url:string):void {
        window.location.href = url;
    }

    isFullScreen(): boolean {
        let d: any = document;

        if (d.fullscreenElement) {
            return true;
        }

        if (d.webkitFullscreenElement) {
            return true;
        }

        if (d.mozFullscreenElement) {
            return true;
        }

        return !!(d.msFullscreenElement);
    }

    public toggleFullScreen(): boolean {
        if (!this.isFullScreen()) {
            return this.openFullScreen();
        }

        let d: any = document;

        if (d.exitFullscreen) {
            d.exitFullscreen();
        } else if (d.msExitFullscreen) {
            d.msExitFullscreen();
        } else if (d.mozCancelFullScreen) {
            d.mozCancelFullScreen();
        } else if (d.webkitExitFullscreen) {
            d.webkitExitFullscreen();
        }
    }

    public openFullScreen() {
        let doc: any = document.documentElement;
        if (doc.requestFullscreen) {
            return doc.requestFullscreen();
        }

        if (doc.mozRequestFullScreen) {
            return doc.mozRequestFullScreen();
        }

        if (doc.webkitRequestFullscreen) {
            return doc.webkitRequestFullscreen();
        }

        if (doc.msRequestFullscreen) {
            return doc.msRequestFullscreen();
        }
    }
}
