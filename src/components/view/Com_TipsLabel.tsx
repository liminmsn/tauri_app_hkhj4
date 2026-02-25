import { Icon } from "@iconify/react/dist/iconify.js";

export default function ({ label, icon }: { label: string, icon?: string }) {
    return <div>
        <p className="inline-block theme_0 p-1 px-2 mt-2 rounded-t-md shadow-sm">
            {icon && <Icon icon={icon} className="inline" height={16} />}
            <span className="ml-1 text-sm">{label}</span>
        </p>
    </div>
}