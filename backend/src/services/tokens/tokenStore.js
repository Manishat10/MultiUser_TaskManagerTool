const blackListedTokens= new Set();
exports.blackListedToken=(token)=>{
    blackListedTokens.add(token);
};
exports.isTokenBlackListed=(token)=>{
    return blackListedTokens.has(token);
};         