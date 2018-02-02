const projectURL = 'https://github.com/MarkRidgway/overwatch-compare';

module.exports = {
  /**
   * Handles a request
   * @param {Object} express request object
   * @param {Object} express response object
   */
  githubRedirect(req, res){
    res.redirect(projectURL);
  }
}