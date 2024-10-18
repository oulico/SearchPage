import {HOST} from "constants/urls"
import {isLocal} from "utils/isLocal"
import {isProd} from "utils/isProd"
import {isVercel} from "utils/isVercel"

export const getBaseURL = () => {
    if (isVercel()) {
        return `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`;
    } else if (isLocal()) {
        return `http://localhost:3000`
    } else if (isProd()) {
        return `https://${HOST}`
    } else {
        return `https://elice-searchpage-clone-v1-606n4e41p-oulicos-projects.vercel.app`
    }
}
