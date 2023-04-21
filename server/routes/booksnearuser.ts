 const express = require('express');
 const axios = require('axios');
 import { PrismaClient, User,  } from '@prisma/client'
import { Sql } from '@prisma/client/runtime';
const prisma = new PrismaClient()
const LocationRoute = express.Router();
import { Request, Response } from "express";


interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    // add other properties as needed
  };
}
interface QueryResult {
  id: number;
}


// LocationRoute.get('/locations', async (req: AuthenticatedRequest, res: Response) => {
//   const { longitude, latitude, radius } = req.query
//   console.log(longitude, latitude, radius);
//   try {
//     const query: any = (await prisma.$queryRaw
//     `SELECT * FROM "User" WHERE ST_DWithin(ST_MakePoint(longitude::float8, latitude::float8), ST_MakePoint(${longitude}::float8, ${latitude}::float8)::geography, radius * ${radius}::float8)`)
//     console.log(query, '1')
//     // const users = await prisma.user.findMany({
//     //   where: {
//     //     id: {
//     //       in: query.map(({ id }) => id)
//     //     }
//     //   }
//     // });
//     // Send the response to the React front-end
//     //console.log(users, '2');
//     res.status(200).json({ query });
//   } catch (error) {
//     //Handle any errors that may occur
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//    }
// });


LocationRoute.put('/:id', async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params; // Get the user ID from request params
  const { location } = req.body; // Get the updated location from request body
  console.log(req)
  // try {
  //   // Update the user location using the user ID and new location
  //   const response: any = (await prisma.$queryRaw`
  //     update "User"
  //     set "location" = "public"."st_point"(${location.lng}, ${location.lat})
  //     where "id" = ${id}
  //   `) as any

  //   res.json({
  //     success: true,
  //     id: id,
  //   });
  // } catch (e) {
  //   console.error(e);
  //   res.status(500).json({
  //     error: 'Server error!',
  //   });
  // }
});

// // LocationRoute.post('/location', async (req, res) => {
// //   const { name, location } = req.body
// //   try {
// //     await prisma.$queryRaw`
// //     insert into "Location" ("name", "location") values
// //     (${name}, "public"."st_point"(${location.lng}, ${location.lat}))
// //     `

// //     res.json({
// //       success: true,
// //     })
// //   } catch (e) {
// //     console.error(e)
// //     res.status(500).json({
// //       error: 'Server error!',
// //     })
// //   }
// // })

LocationRoute.get(`/:userId/nearby-places`, async (req: AuthenticatedRequest, res: Response) => {
  console.log(req);
  const { userId } = req.params
  const { d } = req.query
  const distance = parseInt(String(d)) || 5

//   try {
//     const locations = await prisma.$queryRaw`
//       select * from "locations_near_user"(${parseInt(
//         userId,
//       )}::int, ${distance}::int)
//     `
//     res.json({ data: { locations } })
//   } catch (e) {
//     console.error(e)
//     res.status(500).json({
//       error: 'Server error!',
//     })
//   }
 })







export default LocationRoute;