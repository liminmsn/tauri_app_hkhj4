import { CATEGORY_DSJ, CATEGORY_MOVE, CATEGORY_PLOT, CATEGORY_ZongYi, useCateGoryContext } from "@/hooks/CateGoryProvider";
import { ChangeEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    const { value, update } = useCateGoryContext();

    const onSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.currentTarget.value;
        update({ home: val });
        navigate(val);
    }, [update, navigate]);

    return <select value={value.home} className="ml-1 shouxie" onChange={onSelect}>
        <option value={CATEGORY_PLOT}>推荐</option>
        <option value={CATEGORY_DSJ}>韩剧</option>
        <option value={CATEGORY_MOVE}>电影</option>
        <option value={CATEGORY_ZongYi}>综艺</option>
    </select>
}