import { verifyToken } from "../services/auth.service.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.body.token;
        console.log(req.body);
        
        if (!token) {
            return res.status(401).json({
                message: "user not authenticated",
                success: false,
            });
        }
        
        const payload = await verifyToken(token)

        if (!payload) {
            return res.status(401).json({
                message: "invalid token",
                success: false,
            });
        }
        req.payload = payload;
        console.log("auth checked");
        
        next();
    } catch (error) {
        console.log(error);
    }
};

export default isAuthenticated;
