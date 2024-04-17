import { Expose } from "class-transformer"

class ConfirmAccountRequest {

    @Expose()
    token!: string
}

export default ConfirmAccountRequest