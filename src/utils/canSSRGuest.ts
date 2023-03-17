import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from 'nookies';

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)

        const token = cookies['@barber.token']

        if (token) {
            return {
                redirect: {
                    destination: '/schedule',
                    permanent: false
                }
            }
        }

        return await fn(ctx)

    }
}


