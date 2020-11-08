class MomentComment {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      moment_id: 'required|integer|exists:moments,id',
      text: 'required|string',
    };
  }
}

module.exports = MomentComment;
