const mongoose = require("mongoose");

// definition d'un schèma
const postSchema = mongoose.Schema(
  {
    titre: {
      // chaine de caractère unique non nulle
      type: String,
      unique: true,
      required: [true, "Please enter a title"],
    },
    auteur: {
      // chaine de caractère avec la valeur "unkown" par defaut
      type: String,
      default: "unknown",
    },
    resume: {
      // chaine de caractère non nulle de moins de 100 caractères
      type: String,
      required: [true, "Please enter a resume"],
      maxlength: 100,
    },

    content: {
      // chaine de caractère non nulle, au moins de 100 caractères
      type: String,
      required: [true, "Please add some content"],
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

//créer et exporter un Modéle Post
module.exports = mongoose.model("Post", postSchema);
