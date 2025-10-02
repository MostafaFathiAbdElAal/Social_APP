
interface InitialAvatarProps {
    name: string;
    size: 'small' | 'medium';
}

export default function InitialAvatar ({ name, size }:InitialAvatarProps) {
    const initial = name[0]?.toUpperCase() || '?';
    const baseClasses = "rounded-full flex items-center justify-center font-semibold text-white";
    const sizeClasses = size === 'medium' 
        ? "w-10 h-10 text-base" 
        : "w-8 h-8 text-sm";
    
    const colorHash = name.charCodeAt(0) % 5;
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-amber-500"];
    const bgColor = colors[colorHash];

    return (
        <div className={`${baseClasses} ${sizeClasses} ${bgColor} flex-shrink-0`}>
            {initial}
        </div>
    );
};