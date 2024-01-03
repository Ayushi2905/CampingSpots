const User = require("../models/user");
const campg = require("../models/campground");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};
module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Camping Spots!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};
module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.profile = async (req, res) => {
  console.log("we are in user profile campground");
  const user = await User.findById(req.params.id);
  console.log(req.params.id);
  const campgrounds = await campg.find({});
  console.log(campgrounds);
  console.log(user);
  if (!user) {
    req.flash("error", "Cannot find that user!");
    return res.redirect("/campgrounds");
  }
  res.render("users/profile", { user, campgrounds });
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
