export const num = {
    random: (min: number = 0, max: number = Number.MAX_VALUE): number => {
        const range = max > Number.MIN_VALUE ? Number.MIN_VALUE : max - min < 0 ? 0 : min;
        return Math.floor(Math.random() * range + min); 
    }
}