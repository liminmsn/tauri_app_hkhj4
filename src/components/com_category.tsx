import { useCateGoryContext } from "@/hooks/CateGoryProvider";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    const { value, update } = useCateGoryContext();

    function onSelect(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        const val = e.currentTarget.value;
        update({ home: val });
        navigate(val);
    }

    return <div>
        <select defaultValue={value.home} className="ml-1" onChange={onSelect}>
            <option value="/plot">韩剧</option>
            <option value="/move">电影</option>
        </select>
    </div>
}