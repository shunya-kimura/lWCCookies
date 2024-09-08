import { LightningElement, track } from 'lwc';
// LightningElementを継承し、trackデコレータを使用しているLWCコンポーネントの定義。

export default class LWCCookies extends LightningElement {
    @track cookieName = "techdicerCookie"; // クッキーの名前を追跡可能なプロパティとして設定。
    @track cookieVal = []; // クッキーの値を格納する配列、追跡可能。

    connectedCallback() {
        this.getCookie(); // コンポーネントがDOMに接続された後、クッキーを読み込む。
    }

    handleCookieCreate(){
        // JSON形式のユーザーデータを生成し、クッキーを作成する。
        var value = JSON.stringify([{Name:"First User",Gender:"Male"},{Name:"Second User",Gender:"Female"}]);
        this.createCookie(this.cookieName, value, 1); // 1日の有効期限を設定してクッキーを作成。
    }

    createCookie(name, value, days) {
        var expires;
        // クッキーの有効期限を設定。指定された日数がある場合はその分の日時を計算し、有効期限を設定する。
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // 日数からミリ秒を計算。
            expires = "; expires=" + date.toGMTString(); // GMT形式の日付文字列を生成。
        } else {
            expires = ""; // 日数が指定されていない場合、空文字列を設定。
        }

        document.cookie = name + "=" + escape(value) + expires + "; path=/"; // クッキーを作成または更新。
    }

    getCookie() {
        var tr = this.retriveCookie(); // 現在のクッキーを取得。
        if(tr != ''){
            this.cookieVal = JSON.parse(tr); // クッキーの値が空でない場合、JSONとして解析して格納。
        } else{
            this.cookieVal = []; // クッキーが空の場合、空の配列を設定。
        }
         
        console.log(this.cookieVal); // コンソールにクッキーの値を出力。
    }

    retriveCookie(){
        var cookieString = "; " + document.cookie; // 現在のクッキーをセミコロンで区切る形で取得。
        var parts = cookieString.split("; " + this.cookieName + "="); // クッキー名で分割。
        return decodeURIComponent(parts.pop().split(";").shift()); // 分割した値からクッキーの値部分をデコードして返す。
    }

    deleteCookie() {
        this.createCookie(this.cookieName, '', null); // 現在のクッキー名に空文字列を設定し、クッキーを削除。
    }
}
