import { GraphQLScalarType } from "graphql";

export const EventDataScalar = new GraphQLScalarType({
    name: "EventData",
    description: "Meta information about event",
    // Handling JSON conversion from Backend to Frontend
    serialize(value){
        return JSON.stringify(value)
    },
    // Handling JSON conversion from Frontend to Backend
    parseValue(value){
        return JSON.parse(value);
    },
    parseLiteral(literal){
        return {
            value: literal
        }
    }
});