export type NewsItem = {
  id: string;
  headline: string;
  image: string;
  content: string;
  category: string;
  channel: string;
  timestamp: string;
  timezone: string;
};

export const newsData: NewsItem[] = [
  {
    id: '1',
    headline: 'Tribal Festival Celebrates Heritage in Nagaland',
    image: 'https://easternroutes.com/wp-content/uploads/2018/12/Hornbill_Festival_Nagaland_India-1.jpg',
    content: `The annual tribal festival in Nagaland kicked off with vibrant colors and traditional music. Thousands gathered to witness the unique cultural performances. The event aims to preserve indigenous customs and promote unity among tribes. Local artisans showcased their crafts, attracting tourists from across the country. Food stalls offered authentic tribal cuisine, delighting visitors. Workshops on folk art and dance were held for the youth. The festival also featured storytelling sessions by elders. Environmental conservation was a key theme this year. Organizers emphasized the importance of passing traditions to future generations. The festival will continue for three days, with more events planned each evening.`,
    category: 'Culture',
    channel: 'Tribal Times',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    timezone: 'Asia/Kolkata',
  },
  {
    id: '2',
    headline: 'Healthcare Camp Benefits Tribal Villages in Odisha',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3A1zy3P8i_0-9Cog1w_MKnDKNsFaw7j8I_w&s',
    content: `A free healthcare camp was organized in remote villages of Odisha, providing much-needed medical attention to hundreds. Doctors from various specialties volunteered their services. The initiative focused on maternal and child health, with immunization drives and nutritional guidance. Villagers received free medicines and health check-ups. Awareness sessions on hygiene and sanitation were conducted. The camp also addressed common ailments and chronic diseases. Local leaders expressed gratitude for the outreach. Organizers plan to hold similar camps in other regions. The event highlighted the healthcare challenges faced by tribal communities. Follow-up visits are scheduled for next month.`,
    category: 'Health',
    channel: 'Indigenous Voice',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    timezone: 'Asia/Kolkata',
  },
  {
    id: '3',
    headline: 'Tribal Artists Shine at International Art Fair',
    image: 'https://news.iitgn.ac.in/wp/wp-content/uploads/2022/10/IMG_0694.jpg',
    content: `Tribal artists from India showcased their talent at the International Art Fair in Paris. Their paintings and sculptures received critical acclaim. The exhibition aimed to promote indigenous art on a global platform. Artists interacted with collectors and art enthusiasts. Workshops on traditional techniques were held. The event fostered cultural exchange and collaboration. Several pieces were sold to international buyers. The artists expressed pride in representing their heritage. Organizers plan to invite more tribal artists next year. The fair concluded with a grand closing ceremony.`,
    category: 'Lifestyle',
    channel: 'Heritage Herald',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    timezone: 'Europe/Paris',
  },
  {
    id: '4',
    headline: 'Eco-Friendly Farming Adopted by Tribal Farmers',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRONJAZiRL-VJL-rCvb9JLxxbK8lDqGpxbG6A&s',
    content: `Tribal farmers in Madhya Pradesh have adopted eco-friendly farming practices. Organic fertilizers and natural pest control methods are being used. The initiative aims to improve soil health and crop yield. Training sessions were conducted by agricultural experts. Farmers shared their experiences and success stories. The project is supported by local NGOs. Environmentalists praised the move towards sustainability. The government is considering incentives for organic farming. The community hopes to inspire neighboring villages. Monitoring and evaluation will continue throughout the season.`,
    category: 'Environment',
    channel: 'Community Chronicle',
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    timezone: 'Asia/Kolkata',
  },
  {
    id: '5',
    headline: 'Tribal Youth Win National Sports Championship',
    image: 'https://drishtiias.com/images/uploads/1686656471_image15.png',
    content: `A team of tribal youth from Jharkhand won the national sports championship. Their performance in athletics and team sports was outstanding. Coaches credited their success to rigorous training and community support. The victory brought pride to their village. Local authorities organized a felicitation ceremony. The athletes shared their aspirations for international competitions. Sports facilities in the region are being upgraded. The win has inspired more youth to take up sports. Media coverage highlighted their journey. The team will represent the state in upcoming tournaments.`,
    category: 'Sports',
    channel: 'Tribal Times',
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(), // 30 hours ago
    timezone: 'Asia/Kolkata',
  },
  {
    id: '6',
    headline: 'Traditional Tribal Medicine Gains Recognition',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvdvg-MnXi7HnAwbLFmv-KRY2643u3KI249g&s',
    content: `Traditional tribal medicine practices are gaining recognition in academic circles. Researchers are documenting herbal remedies used by indigenous healers. The project aims to preserve ancient knowledge. Workshops were held to train young practitioners. Collaboration with modern healthcare providers is being explored. The initiative has received government funding. Community elders play a key role in knowledge transfer. The project also focuses on sustainable harvesting of medicinal plants. Awareness campaigns are being conducted in schools. The findings will be published in scientific journals.`,
    category: 'Technology',
    channel: 'Indigenous Voice',
    timestamp: new Date(Date.now() - 35 * 60 * 60 * 1000).toISOString(), // 35 hours ago
    timezone: 'Asia/Kolkata',
  },
  {
    id: '7',
    headline: 'Tribal Women Entrepreneurs Launch Handicraft Brand',
    image: 'https://static.wixstatic.com/media/183740_c6627454b09e4a0bacbf806a4162389f~mv2.jpeg/v1/fill/w_568,h_274,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/183740_c6627454b09e4a0bacbf806a4162389f~mv2.jpeg',
    content: `A group of tribal women in Chhattisgarh have launched their own handicraft brand. The initiative empowers women through skill development and entrepreneurship. Products include handwoven textiles and jewelry. The brand has received orders from urban markets. Training programs are supported by local NGOs. The women shared their stories of overcoming challenges. The project aims to create sustainable livelihoods. Community leaders praised the initiative. Plans are underway to expand the product line. The brand will participate in upcoming trade fairs.`,
    category: 'Politics',
    channel: 'Heritage Herald',
    timestamp: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(), // 40 hours ago
    timezone: 'Asia/Kolkata',
  },
  {
    id: '8',
    headline: 'Tribal Language Preservation Project Launched',
    image: 'https://media.licdn.com/dms/image/sync/v2/D5627AQHLftkKovJBKQ/articleshare-shrink_800/B56ZcWJvEnGoAI-/0/1748423341931?e=2147483647&v=beta&t=9xAo9W6rb2h717M-JGxaROGbNu218l3tg2ZAeXTIpmQ',
    content: `A new project to preserve tribal languages has been launched in Assam. Linguists are working with community elders to document oral traditions. The project includes the creation of dictionaries and learning materials. Schools are introducing tribal languages in their curriculum. The initiative aims to prevent language extinction. Cultural events celebrate linguistic diversity. The project has received international support. Community participation is encouraged at all levels. The findings will be shared at a global conference. The project is expected to run for five years.`,
    category: 'Human Rights',
    channel: 'Community Chronicle',
    timestamp: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString(), // 44 hours ago
    timezone: 'Asia/Kolkata',
  },
  {
    id: '9',
    headline: 'Tribal Community Hosts Annual River Clean-Up',
    image: 'https://media.river-cleanup.org/11902/conversions/2022-04_img6-800.jpeg',
    content: `The annual river clean-up drive was organized by a tribal community in Maharashtra. Volunteers collected plastic waste and debris. The event raised awareness about water conservation. Local schools participated in the campaign. Environmental experts conducted workshops on waste management. The initiative received media coverage. The community plans to install waste bins along the riverbank. The event concluded with a cultural program. Organizers thanked all participants. Plans are in place for regular clean-up drives.`,
    category: 'Environment',
    channel: 'Tribal Times',
    timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000).toISOString(), // 47 hours ago
    timezone: 'Asia/Kolkata',
  },
  {
    id: '10',
    headline: 'Tribal School Wins National Science Award',
    image: 'https://picsum.photos/seed/tribal10/400/250',
    content: `A tribal school in Arunachal Pradesh has won the national science award. Students developed innovative projects on renewable energy. The award ceremony was attended by dignitaries. Teachers credited the success to hands-on learning. The school plans to set up a science lab with the prize money. The achievement has inspired neighboring schools. Media reports highlighted the importance of STEM education. The students shared their future aspirations. The school will represent the state at an international science fair. The community celebrated the achievement with a special event.`,
    category: 'Education',
    channel: 'Indigenous Voice',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago
    timezone: 'Asia/Kolkata',
  },
]; 