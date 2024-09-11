const {MONGO_USERNAME,MONGO_PASSWORD}=process.env
// console.log(process.env);

export const connectionStr ="mongodb+srv://"+MONGO_USERNAME+":"+MONGO_PASSWORD+"@cluster0.vos1u.mongodb.net/RestaurantDB?retryWrites=true&w=majority&appName=Cluster0"