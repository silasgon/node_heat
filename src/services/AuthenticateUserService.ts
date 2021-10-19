import axios from "axios";
import prismaClient from '../prisma';
import {sign} from 'jsonwebtoken';


interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

class AuthenticateUserService {

    async execute(code: string){

        //Receber code(string)
        const url = 'https://github.com/login/oauth/access_token';

        //Recuperar o access_token no github
        const { data:accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        })

        //Recuperar infos do user no github
        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        //verificar se o usuario existe no DB
        let { login, id, avatar_url, name} = response.data;

        const user = await prismaClient.user.findFirst({ 
            where: {
                github_id: id
            }
        })

        //----NAO = Cria no DB, gera um token 
        if(!user){
            await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        //----SIM = Gera um token
        const token = sign({
            user: {
                name: user.name,
                avatar_ur: avatar_url,
                id: user.id
            }
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "1d",
        }
        
        )
        

        //Retorna o token com as infos do user
        return {token, user}
    }
}

export { AuthenticateUserService };