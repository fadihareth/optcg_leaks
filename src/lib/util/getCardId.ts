export default function getCardId(id: number, set: string): string {
    return id < 10 ? `${set}-00${id}` : id < 100 ? `${set}-0${id}` : `${set}-${id}`;
}