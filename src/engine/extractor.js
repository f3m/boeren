class Extractor {
   let criteria;
   let trigger;

   applies = (rawRow) =>  {
       return rawRow[criteria]==trigger;
}

   transform(parameters, rawRow) {
       return null;
   }
}

export class Extractor;