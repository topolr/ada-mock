import {view, View} from "adajs";

@view({
    className: "welcome",
    template: "./template/base.html",
    style: "./style/base.scss"
})
class Welcome extends View {
    oncreated() {
        this.render();
    }
}

export default Welcome;