export const picture = {
    sex: (sex: string): string => {
        return sex === 'Female' ? '/avatar_pic_female_default.png' :
                sex === 'Male' ? '/avatar_pic_male_default.png' :
                    sex === 'Other' ? '/avatar_pic_other_default.png' :
                        '/avatar_pic_default.png'; 
    }
}