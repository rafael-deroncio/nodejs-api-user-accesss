import md5 from "md5";

export const str = {
    name(name: string): string {
        return name.trim().toLowerCase().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },

    username(name: string, id: number): string {
        const unique: string = md5(`${id}` + 5).substring(0, 5);
        const parts: string[] = name.trim().toLowerCase().split(' ');
        const username: string = `${parts[0]}.${parts.pop()}.${unique}`;
        return username;
    },
}