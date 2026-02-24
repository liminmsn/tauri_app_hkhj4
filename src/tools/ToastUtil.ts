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
    static success() {
        this.stop();
        this.toastRun("完成", "success");
        setTimeout(() => {
            this.stop();
        }, 500);
    }
    static stop() {
        toast.dismiss(this.ID);
    }
}