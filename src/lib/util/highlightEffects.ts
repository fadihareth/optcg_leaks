type Replacement = {
    pattern: RegExp;
    className: string;
};

const effects: Replacement[] = [
    {
        pattern: /\[On Play\]/gi,
        className: "blue-effect",
    },
    {
        pattern: /\[Activate Main\]/gi,
        className: "blue-effect",
    },
    {
        pattern: /\[Opponent’s Turn\]/gi,
        className: "blue-effect",
    },
    {
        pattern: /\[Once Per Turn\]/gi,
        className: "red-effect",
    },
    {
        pattern: /\[When Attacking\]/gi,
        className: "blue-effect",
    },
    {
        pattern: /\[On Your Opponent’s Attack\]/gi,
        className: "blue-effect",
    },
    {
        pattern: /\<Rush\>/gi,
        className: "orange-effect",
    },
    {
        pattern: /\[Blocker\]/gi,
        className: "orange-effect",
    },
    {
        pattern: /\<Blocker\>/gi,
        className: "orange-effect",
    },
    {
        pattern: /\[(DON[^\]]*)\]/gi,
        className: "black-effect",
    },
    {
        pattern: /\[Trigger\]/gi,
        className: "yellow-effect",
    },
];

export default function highlightEffects(text: string): string {
    let output = text;

    for (const { pattern, className } of effects) {
        output = output.replace(pattern, (match) => {
            return `<span class="effect ${className}">${match.replace(/[\[\]<>]/g, "")}</span>`;
        });
    }

    return output;
}