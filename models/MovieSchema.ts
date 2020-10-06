import { Document, Model, model, Schema } from "mongoose";

export interface IMovie extends Document{
    film:string;
    genre:string;
    lead_studio:string;
    year:number;
}

const MovieSchema : Schema = new Schema({
    id:{
        type: String,
        unique: true,
    },
    film:{
        type: String,
        trim: false,
        required: true,
        unique: true,
    },
    genre:{
        type: String,
        trim: true,
        required: true,
    },
    lead_studio:{
        type: String,
        trim: true,
        required: true,
    },
    year:{
        type: Number,
        trim: true,
        required: true,
    }
});

const Movie : Model<IMovie> = model("Movie", MovieSchema);

export default Movie;


