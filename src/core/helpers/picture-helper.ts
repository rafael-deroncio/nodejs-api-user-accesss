import SexTypeEnum from "../configurations/enums/sex-type-enum";

export const picture = {
    sex: (sex: string): string => {
        return sex === SexTypeEnum[SexTypeEnum.Female] ? '/avatar_pic_female_default.png' :
                sex === SexTypeEnum[SexTypeEnum.Male] ? '/avatar_pic_male_default.png' :
                    sex === SexTypeEnum[SexTypeEnum.Other] ? '/avatar_pic_other_default.png' :
                        '/avatar_pic_default.png'; 
    }
}