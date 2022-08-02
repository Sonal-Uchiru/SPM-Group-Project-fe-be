import jwt from 'jsonwebtoken'

function getToken(req) {
    return new Promise((resolve) => {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
            resolve(req.headers.authorization.split(' ')[1]);
        }
        return resolve(null)
    })

}

export async function decode(req) {
    const token = await getToken(req)
    let decodedToken = "";
    if (!token) {
        throw new Error('Authorization token is required')
    }
    await jwt.verify(token, process.env.JWTPRIVATEKEY, function (err, decoded) {
        if (err) {
            throw new Error('Error : ' + err)
        }
        decodedToken = decoded
    })
    return decodedToken
}
