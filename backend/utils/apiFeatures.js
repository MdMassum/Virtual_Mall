class ApiFeatures{
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }
    search(){
        const keyword = this.querystr.keyword ?{
            name:{
                $regex: this.querystr.keyword,
                $options:"i",  // this means case insensetive
            },

        }:{}
        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        // const queryCopy = this.querystr // but this.querystr is object and passed through reference so do->
        const queryCopy = {...this.querystr} // using spread operator

        // removing fields that are from search field and not require in filter
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key)=>{delete queryCopy[key]});
     
        // filter for pricing and rating -->
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|lt|gte|lte)\b/g,(key)=>`$${key}`)    // basically changing from gt to $gt
        this.query = this.query.find(JSON.parse(querystr));
        // this.query = this.query.find(queryCopy);  // basically running find({category:" "});

        return this;
    }

    pagination(resultPerPage){
        const currPage = Number(this.querystr.page) || 1;
        const skip = resultPerPage * (currPage-1);
        
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports = ApiFeatures;