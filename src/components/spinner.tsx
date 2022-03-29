import React from "react";

interface propType {
    visible: boolean;
    compact?: boolean;
    text: string;
}

export default function Spinner({ visible, compact, text }: propType) {
    return visible ? (
        compact ? (
            <div className="w-full overflow-hidden">
                <i className="bi bi-arrow-repeat inline-block animate-spin"></i>
                <span className="mx-2">{text}</span>
            </div>
        ) : (
            <div className="w-full p-4 text-center text-green-500 overflow-hidden">
                <i className="bi bi-arrow-repeat text-3xl m-auto block animate-spin"></i>
                <div className="mt-4">{text}</div>
            </div>
        )
    ) : (
        <React.Fragment />
    );
}