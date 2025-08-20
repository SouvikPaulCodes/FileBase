const {createClient} = require("@supabase/supabase-js")
require("dotenv").config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function createBucket() {
    const {data, error} = await supabase.storage.
                        createBucket('files', {
                            public: false
                        })

    if(error) {
        console.log("An Error occurred", error)
        return
    }

    console.log("Bucket is created", data)
    
}

createBucket()

module.exports = supabase