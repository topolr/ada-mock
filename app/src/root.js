import {root, StaticViewGroup} from "adajs";
import Welcome from "./welcome/base";

@root()
class Root extends StaticViewGroup {
    oncreated(){
        this.addChild(Welcome);
    }
}

export default Root;