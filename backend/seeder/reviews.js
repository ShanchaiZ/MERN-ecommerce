const ObjectId = require("mongodb").ObjectId;

const reviews = [
    {
        comment: "Review 1. Lorem ipsum dolor sit amet. Et officia beatae vel unde error non fuga magni ut error odio qui tempora laboriosam.",
        rating: 5,
        user: { _id: new ObjectId(), name: "John Doe" }
    },
    {
        comment: "Review 2. Lorem ipsum dolor sit amet. Et officia beatae vel unde error non fuga magni ut error odio qui tempora laboriosam.",
        rating: 5,
        user: { _id: new ObjectId(), name: "John Doe" }
    },
    {
        comment: "Review 3. Lorem ipsum dolor sit amet. Et officia beatae vel unde error non fuga magni ut error odio qui tempora laboriosam.",
        rating: 5,
        user: { _id: new ObjectId(), name: "John Doe" }
    },
    {
        comment: "Review 4. Lorem ipsum dolor sit amet. Et officia beatae vel unde error non fuga magni ut error odio qui tempora laboriosam.",
        rating: 5,
        user: { _id: new ObjectId(), name: "John Doe" }
    },
    {
        comment: "Review5. Lorem ipsum dolor sit amet. Et officia beatae vel unde error non fuga magni ut error odio qui tempora laboriosam.",
        rating: 5,
        user: { _id: new ObjectId(), name: "John Doe" }
    }
]

module.exports = reviews;