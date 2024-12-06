import { User } from "../interfaces/user.interface";
import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator"
export class LoginAuthDto implements User{
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @MinLength(6)
    @MaxLength(25)
    @IsNotEmpty()
    password: string;

}