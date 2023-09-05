// import Users from "../models/usermodel.js";

// export const verifyUser = async(req, res, next) => {
//     if(!req.session.userId){
//         return response.send(401).json({ message: "Please login to your account" })
//     }
//     const user = await Users.findOne({
//         where: {
//             email: req.session.userId
//         }
//     });
//     if(!user){
//         return res.status(404).json({ message: "User not found" });
//     }
//     req.userId = user.id;
//     req.role = user.role;
//     next();
// }

// export const adminOnly = async (req, res, next) => {
//     const user =  await Users.findOne({
//         where: {
//             uuid: req.session.userId
//         }
//     });
//     if(!user) return res.status(404).json({ message: "User not found" });
//     if(user.role !== "admin") return res.status(404).json({ message: "Restricted access" });
//     next();
// }