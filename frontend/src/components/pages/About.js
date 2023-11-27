import React from 'react';

function About() {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col bg-[url('../../assets/images/fountain.jpg')] bg-cover bg-center h-full">
          <h1 className="mt-20 pt-10 text-center text-5xl font-bold">
            About Us
          </h1>
          <div className="flex w-full mt-10 px-20">
            <div className="flex-1 p-10 text-center text-3xl bg-gray-700 text-textIcon rounded-xl mx-5">
              <h1 className="text-4xl underline pb-5">ድርጅቱ የተቋቋመበት ዓላማ</h1>
              <p>
                የፍልውሃ አገልግሎት ድርጅት በሚኒስትሮች ምክር ቤት ደንብ ቁጥር 25/84 መሰረት የከርሰ ምድር
                ፍልውሃን በመጠቀም ለመታጠቢያ አገልግሎት፣ ለመዝናኛ ፣ ለፈውስ አገልግሎት፣ ለመታሻ ፣ ለሳውና ባዝ
                እና ለእንፋሎት መታጠቢያ አገልግሎት እንዲሁም ለተዛማጅ የሆቴል አገልግሎት እንዲውል ነው፡፡
              </p>
            </div>
            <div className="flex-1 p-10 text-center text-3xl bg-gray-700 text-textIcon rounded-xl mx-5">
              <h1 className="text-4xl underline pb-5">Aim of the company</h1>
              <p>
                Filwuha is established according to the proclamation of the
                Transitional Government of Ethiopia, Proclamation No. 25/84 On
                the Allocation of Rural Lands for Showering, Recreation,
                Medication, Massaging, Sauna and Steam services, this is also
                applicable for Hotel and Spa services for Ethiopians including
                for foreign nationals.
              </p>
            </div>
          </div>
          <div className="flex bg-gray-700 text-textIcon rounded-xl mx-10 mt-20">
            <div className="flex-1 p-5 text-center text-3xl  mx-5 w-1/3">
              <h1 className="text-4xl underline pb-5">የድርጅቱ ራዕይ </h1>
              <p className="text-xl">
                በሃገሪቱ በተፈጥሮ ፍልውሃ መታጠቢያ በስፓ በሆቴል አገልግሎት ግንባር ቀደምና ተመራጭ ሆኖ ማየት፡፡
              </p>

              <h1 className="text-4xl underline pb-5 mt-5">Vision</h1>
              <p className="text-xl">
                To be the leading company in the country in providing showering,
                recreation, medication, massaging, sauna and steam services.
              </p>
            </div>
            <div className="flex-1 p-5 text-center text-3xl  mx-5 w-1/3">
              <h1 className="text-4xl underline pb-5">የድርጅቱ ተልዕኮ</h1>
              <p className="text-xl">
                ድርጅቱን ዘርፈ ብዙ አገልግሎት ማለትም ደረጃውን የጠበቀ የመታጠቢያ ፣ የፊዚዮቴራፒ ፣ የሳውና ባዝ ፣
                የስቲም ባዝ ፣ ህክምና ፣ የሆቴል፣ የመናፈሻ እና የመሰብሰቢያ አዳራሽ አገልግሎቶቻችንን በብቃት
                በጥራት በመስጠት የተጠቃሚውን ህብረተሰብ ፍላጎት ማርካት እና የቱሪዝም መዳረሻ እንዲሆን በማስቻል
                የሃገሪቱን የእድገትና ትራንስፎርሜሽ ዕቅድ ለማሳካት የበኩሉን ድርሻ መወጣት ነው ፡
              </p>

              <h1 className="text-4xl underline pb-5 mt-5">Mission</h1>
              <p className="text-xl">
                To provide showering, recreation, medication, massaging, sauna
                and steam services for the public in a professional manner.
              </p>
            </div>
            <div className="flex-1 p-5 text-center text-3xl  mx-5 w-1/3">
              <h1 className="text-4xl underline pb-5">የድርጅቱ እሴት</h1>
              <p className="text-xl">
                ደንበኛ የህልውናችን መሰረት ነው ፣ የደንበኞቻችንን አስተያየት መቀበልና ስህተታችንን በማረም
                ደንበኞችን ማርካት <br />
                በተነሳሽነት ፣ በቁርጠኝነትና በጋራ ስሜት ለውጤት መስራት <br />
                የአገልግሎት ጥራትና የመስተንግዶ ቅልጥፍና ተቀዳሚ ተግባራችን ነው፣ <br />
                በግልፅነትና ታማኝነት ላይ የተመሠረተ ቀልጣፋና የደንበኞችን ጊዜ የሚቆጥብ አገልግሎት መስጠት
              </p>

              <h1 className="text-4xl underline pb-5 mt-5">Purpose</h1>
              <p className="text-xl">
                Our customers are the basis of our existence, we accept
                customer's feedback and correct our mistakes to satisfy their
                needs. Working for results with motivation, commitment and
                common sense Quality of service and efficiency of hospitality is
                our priority. Providing efficient and time-saving services based
                on transparency and honesty
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
