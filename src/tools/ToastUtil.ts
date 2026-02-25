import { toast, TypeOptions } from "react-toastify";

export default class ToastUtil {
    private static ID = 0;
    private static toastRun(label: string, type: TypeOptions, isLoading = false) {
        toast(label, {
            type, isLoading,
            toastId: this.ID
        }) as number;
    }
    static loding() {
        this.stop();
        this.toastRun("加载中", "default", true);
    }
    static success(label = "完成") {
        this.stop();
        this.toastRun(label, "success");
    }
    static stop() {
        toast.dismiss(this.ID);
    }
}