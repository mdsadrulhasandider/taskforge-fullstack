import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Pre-defined seed tasks to populate the DB when empty
const SEED_TASKS = [
  {
    title: "Next.js Full-Stack Developer for SaaS Dashboard",
    shortDescription: "Develop a premium responsive dashboard panel integrating third-party APIs.",
    fullDescription: "We are seeking a senior Full-Stack React/Next.js developer to construct our client management panel. You will connect PostgreSQL databases, craft responsive layouts via Tailwind CSS, and build robust API routes. Security audits and unit testing are required before deliverables. Must be experienced with Tailwind, TypeScript, and state managers.",
    budget: 1200,
    category: "Development",
    location: "Remote",
    rating: 4.9,
    priority: "high",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop",
    clientName: "InnoTech Solutions",
    clientEmail: "admin@taskforge.com",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    title: "Sleek Mobile App UI/UX Redesign",
    shortDescription: "Create wireframes, layouts, and interactive design prototypes for a fitness application.",
    fullDescription: "We need a skilled designer to rethink our fitness tracker application interface. Deliverables include wireframes, high-fidelity Figma components, interactive flows, design system configuration, and handoff assets. Must provide a strong UI/UX portfolio of complex interactive screens.",
    budget: 650,
    category: "Design",
    location: "Remote",
    rating: 4.8,
    priority: "medium",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop",
    clientName: "PulseFit Studio",
    clientEmail: "admin@taskforge.com",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
  {
    title: "Technical SEO Audit & Strategy Proposal",
    shortDescription: "Optimize a large scale corporate website for Core Web Vitals and organic indexing.",
    fullDescription: "We require an SEO specialist to conduct a comprehensive structural and content audit. Identify indexing blockages, speed up loading parameters for Core Web Vitals, restructure sitemaps, and write a actionable content optimization roadmap. Experience with ScreamingFrog, Ahrefs, and Google Search Console is critical.",
    budget: 350,
    category: "Marketing",
    location: "Hybrid",
    rating: 4.6,
    priority: "low",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    clientName: "Zenith Corporates",
    clientEmail: "zenith@client.com",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "E-Commerce Webshop with Next.js & Stripe",
    shortDescription: "Build a production-ready custom e-commerce solution with dynamic cart and checkout.",
    fullDescription: "Seeking a React expert to construct a complete e-commerce experience. Features: Product filtering, secure custom Stripe integration, Webhook handlers, transactional mail updates, and user order logs. The layout must feel extremely premium, responsive, and follow SEO best practices.",
    budget: 2450,
    category: "Development",
    location: "Remote",
    rating: 5.0,
    priority: "high",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop",
    clientName: "Moda Fashion Co",
    clientEmail: "admin@taskforge.com",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    title: "SaaS Product Content Strategy & Copywriting",
    shortDescription: "Write optimized landing page headers, marketing copies, and developer docs.",
    fullDescription: "We are launching a developer tool and need premium, engaging documentation and copywriting. You will write 4 landing page options, email workflows, and restructure our guide documentation. Ability to explain complex programming APIs in simple English is a must.",
    budget: 500,
    category: "Writing",
    location: "Remote",
    rating: 4.7,
    priority: "medium",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
    clientName: "DevFlow Inc",
    clientEmail: "devflow@client.com",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "Corporate Pitch Deck & Presentation Designer",
    shortDescription: "Design a high-converting, visually stunning pitch deck for venture capital series A.",
    fullDescription: "We need an elite slide deck designer to help us finalize our investment presentation. You will structure infographics, design consistent slides in our brand identity, and format data tables elegantly. Deliver in editable PowerPoint and Figma formats.",
    budget: 800,
    category: "Design",
    location: "On-site",
    rating: 4.9,
    priority: "high",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop",
    clientName: "Apex Ventures",
    clientEmail: "admin@taskforge.com",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "Financial Web Portal UI & Integration",
    shortDescription: "Integrate Plaid banking feeds and chart historical metrics using Recharts.",
    fullDescription: "Develop custom financial charts showing investment portfolios. Requirements: Secure login, bank feed connections, visual data mapping, and real-time alerts. High emphasis on data isolation, security encryption, and pixel-perfect layouts.",
    budget: 1900,
    category: "Development",
    location: "Remote",
    rating: 4.7,
    priority: "high",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    clientName: "WealthForge Capital",
    clientEmail: "wealthforge@client.com",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "Technical Writing for Cybersecurity Blog",
    shortDescription: "Write deep-dive articles explaining zero-trust architectures and server security.",
    fullDescription: "Looking for an engineer who writes. Produce three high-quality articles (2000 words each) covering API penetration, server hardening checklists, and explanation of OAuth validation routines. Tone must be technical and authority-focused.",
    budget: 400,
    category: "Writing",
    location: "Remote",
    rating: 4.5,
    priority: "low",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    clientName: "CyberShield Web",
    clientEmail: "shield@client.com",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export async function GET(req: Request) {
  try {
    await dbConnect();

    // Automatically fix legacy broken seed image URLs in the database
    await Task.updateMany(
      { image: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop" },
      { $set: { image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop" } }
    );
    await Task.updateMany(
      { image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop" },
      { $set: { image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop" } }
    );

    const { searchParams } = new URL(req.url);

    // Seed if collection is empty
    const count = await Task.countDocuments();
    if (count === 0) {
      await Task.insertMany(SEED_TASKS);
      console.log('Seeded database with initial tasks.');
    }

    // Build filter query
    const filter: any = {};

    const search = searchParams.get('search');
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const category = searchParams.get('category');
    if (category && category !== 'All') {
      filter.category = category;
    }

    const location = searchParams.get('location');
    if (location && location !== 'All') {
      filter.location = location;
    }

    const minBudget = searchParams.get('minBudget');
    const maxBudget = searchParams.get('maxBudget');
    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = parseInt(minBudget);
      if (maxBudget) filter.budget.$lte = parseInt(maxBudget);
    }

    const priority = searchParams.get('priority');
    if (priority && priority !== 'All') {
      filter.priority = priority;
    }

    // Sorting parameters
    const sortBy = searchParams.get('sortBy') || 'date'; // budget, rating, date
    const order = searchParams.get('order') || 'desc'; // asc, desc

    let sortOption: any = {};
    if (sortBy === 'budget') {
      sortOption.budget = order === 'asc' ? 1 : -1;
    } else if (sortBy === 'rating') {
      sortOption.rating = order === 'asc' ? 1 : -1;
    } else {
      sortOption.date = order === 'asc' ? 1 : -1;
    }

    // Query tasks
    const tasks = await Task.find(filter).sort(sortOption);

    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error('Fetch Tasks Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to post a task.' },
        { status: 401 }
      );
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: 'Session expired. Please log in again.' },
        { status: 401 }
      );
    }

    const {
      title,
      shortDescription,
      fullDescription,
      budget,
      category,
      location,
      priority,
      image
    } = await req.json();

    // Validations
    if (!title || !shortDescription || !fullDescription || !budget || !category || !location || !priority) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const newTask = await Task.create({
      title,
      shortDescription,
      fullDescription,
      budget: parseFloat(budget),
      category,
      location,
      priority,
      rating: 5.0, // default rating for new posts
      image: image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
      clientName: decoded.name,
      clientEmail: decoded.email,
      date: new Date().toISOString()
    });

    return NextResponse.json(
      { message: 'Task posted successfully', task: newTask },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Add Task Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
