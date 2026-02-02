const EFFECTS: Record<string, RegExp[]> = {
    "blue-effect": [
        /\[On Play\]/gi,
        /\[Activate Main\]/gi,
        /\[When Attacking\]/gi,
        /\[Your Turn\]/gi,
        /\[End of Your Turn\]/gi,
        /\[On K.O.\]/gi,
        /\[Opponent’s Turn\]/gi,
        /\[On Your Opponent’s Attack\]/gi,
        /\[Main\]/gi,
    ],
    "red-effect": [
        /\[Once Per Turn\]/gi,
        /\[Counter\]/gi,
    ],
    "orange-effect": [
        /<(?:Rush|Blocker|Banish|Double Attack|Unblockable)>/gi,
        /\[Blocker\]/gi,
    ],
    "black-effect": [
        /\[(DON[^\]]*)\]/gi,
    ],
    "yellow-effect": [
        /\[Trigger\]/gi,
    ],
};

const stripBrackets = (text: string) =>
    text.replace(/[\[\]<>]/g, "");

export default function highlightEffects(text: string): string {
    let output = text;

    for (const [className, patterns] of Object.entries(EFFECTS)) {
        for (const pattern of patterns) {
            output = output.replace(pattern, match => (
                `<span class="effect ${className}">${stripBrackets(match)}</span>`
            ));
        }
    }

    return output;
}