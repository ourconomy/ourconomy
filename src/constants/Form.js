module.exports = {
  EDIT: {
    id: "edit",
    fields: [
      "title",
      "description",
      "homepage",
      "telephone",
      "city",
      "zip",
      "email",
      "street",
      "lat",
      "lng",
      "category",
      "license",
      "tags"
    ]
  },

  PRODUCT: {
    id: "product",
    fields: [
      "title",
      "description",
      "homepage",
      "origin",
      "tags",
      "license"
     ]
  },

  RATING: {
    id: "rating",
    fields: [
      "context",
      "value",
      "comment"
    ]
  },

  LOGIN: {
    id: "login",
    fields: [
      "username",
      "password"
    ]
  },

  REGISTER: {
    id: "register",
    fields: [
      "username",
      "email",
      "password"
    ]
  }
};
