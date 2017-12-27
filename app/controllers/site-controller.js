module.exports = {
  ohhimark(req, res){
    res.json({ message: 'oh hi mark' });
  },
  status(req, res){
    res.json({ message: 'oh hi mark' });
  },
  show404(req, res){
    res.status(404);
    res.json({ error: '404: Path Not Found' });
  }
}