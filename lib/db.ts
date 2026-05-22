import { cacheTag } from "next/cache";

import { prisma } from './prisma';
import { MESSAGES } from '@/constants/messages.constants';
import { CACHE_TAGS } from '@/constants/cacheTags.constants';

// ===== POST FUNCTIONS =====

export async function getPosts() {
  "use cache"
  cacheTag(CACHE_TAGS.POSTS);
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getPost(id: number) {
  "use cache";
  cacheTag(CACHE_TAGS.postById(id));
  return await prisma.post.findUnique({
    where: { id },
    include: {
      claps: true,
      author: true,
    }
  });
}

export async function createPost(data: { title: string; content: string, authorId: number }) {
  return await prisma.post.create({
    data,
  });
}

export async function updatePost(id: number, data: { title?: string; content?: string }) {
  return await prisma.post.update({
    where: { id },
    data,
  });
}

export async function deletePost(id: number) {
  return await prisma.post.delete({
    where: { id },
  });
}

// ===== CLAP FUNCTIONS =====

export async function getUserClapsForPost(postId: number, userId: number) {
  const clap = await prisma.clap.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      }
    }
  });
  
  return clap?.count || 0;
}

export async function addClap(postId: number, userId: number, count: number = 1) {
  // Check current claps
  const existingClap = await prisma.clap.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      }
    }
  });
  
  const currentCount = existingClap?.count || 0;
  const newCount = Math.min(currentCount + count, 50); // Max 50 claps
  const actualIncrement = newCount - currentCount;
  
  if (actualIncrement <= 0) {
    return { success: false, message: MESSAGES.MAX_CLAPS_REACHED, newCount: currentCount, remaining: 0 };
  }
  
  // Upsert clap record
  await prisma.clap.upsert({
    where: {
      postId_userId: {
        postId,
        userId,
      }
    },
    update: {
      count: newCount,
    },
    create: {
      postId,
      userId,
      count: actualIncrement,
    }
  });
  
  // Update total claps on post
  await prisma.post.update({
    where: { id: postId },
    data: {
      totalClaps: {
        increment: actualIncrement,
      }
    }
  });
  
  return { 
    success: true, 
    newCount, 
    totalClaps: actualIncrement,
    remaining: 50 - newCount 
  };
}
