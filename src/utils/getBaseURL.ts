import {HOST} from "constants/urls"
import {isLocal} from "utils/isLocal"
import {isProd} from "utils/isProd"
import {isVercel} from "utils/isVercel"

export const getBaseURL = () => {
    if (isVercel()) {
        console.log('isVercel')
        console.log(process.env.VERCEL_URL)
        console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
        return `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`;
    } else if (isLocal()) {
        console.log('isLocal')
        console.log(process.env.VERCEL_URL)
        console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
        return `http://localhost:3000`
    } else if (isProd()) {
        console.log('isProd')
        console.log(process.env.VERCEL_URL)
        console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
        return `https://${HOST}`
    } else {
        console.log('else')
        console.log(process.env.VERCEL_URL)
        console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
        return `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`
    }
}
