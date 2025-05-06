# CRUD Operations Guide for Learning Management System

This document provides a comprehensive guide to the Create, Read, Update, and Delete (CRUD) operations implemented in the Learning Management System, focusing on how the frontend React components interact with the backend REST API endpoints.

## Table of Contents

1. [Learning Plans](#learning-plans)
2. [Comments](#comments)
3. [Likes](#likes)
4. [User Profiles](#user-profiles)
5. [Follows](#follows)
6. [Notifications](#notifications)

## Learning Plans

Learning plans are the core entity of the application, allowing users to create structured learning paths with topics and resources.

### Endpoints

| Operation | Endpoint | HTTP Method | Description |
|-----------|----------|-------------|-------------|
| Create | `/api/v1/learning-plans/save` | POST | Create a new learning plan |
| Read (All) | `/api/v1/learning-plans` | GET | Get all learning plans |
| Read (One) | `/api/v1/learning-plans/{id}` | GET | Get a specific learning plan by ID |
| Read (User) | `/api/v1/learning-plans/user/{userId}` | GET | Get all learning plans by a specific user |
| Update | `/api/v1/learning-plans/edit/{id}` | PUT | Update an existing learning plan |
| Delete | `/api/v1/learning-plans/delete/{id}` | DELETE | Delete a learning plan |

### Frontend Implementation

#### Create Learning Plan

**Component**: `AddLearningPlan.jsx`

```jsx
// Key code snippet for creating a learning plan
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Filter out empty topics and resources
    const filteredTopics = topics.filter(topic => topic.title.trim() !== '');
    const filteredResources = resources.filter(resource => resource.title.trim() !== '' && resource.url.trim() !== '');
    
    const learningPlan = {
      title,
      description,
      userId: user.userId,
      username: user.username,
      status,
      isPublic,
      topics: filteredTopics,
      resources: filteredResources,
      completionDeadline: completionDeadline || null
    };
    
    const response = await axios.post(`${API_URL}/save`, learningPlan);
    
    if (response.data.success) {
      alert('Learning plan created successfully!');
      navigate('/learning-plans');
    } else {
      setError(response.data.message || 'Error creating learning plan');
    }
  } catch (error) {
    setError('Error creating learning plan');
    console.error('Error creating learning plan:', error);
  }
};
```

#### Read Learning Plans

**Component**: `LearningPlanList.jsx`

```jsx
// Key code snippet for fetching all learning plans
useEffect(() => {
  const fetchLearningPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setLearningPlans(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching learning plans');
      console.error('Error fetching learning plans:', error);
      setLoading(false);
    }
  };

  fetchLearningPlans();
}, []);
```

**Component**: `LearningPlanDetail.jsx`

```jsx
// Key code snippet for fetching a specific learning plan
useEffect(() => {
  const fetchLearningPlan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${planId}`);
      setLearningPlan(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching learning plan details');
      console.error('Error fetching learning plan details:', error);
      setLoading(false);
    }
  };

  fetchLearningPlan();
}, [planId]);
```

#### Update Learning Plan

**Component**: `EditLearningPlan.jsx`

```jsx
// Key code snippet for updating a learning plan
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Filter out empty topics and resources
    const filteredTopics = topics.filter(topic => topic.title.trim() !== '');
    const filteredResources = resources.filter(resource => resource.title.trim() !== '' && resource.url.trim() !== '');
    
    const learningPlan = {
      _id: planId,
      title,
      description,
      userId: user.userId,
      username: user.username,
      status,
      isPublic,
      topics: filteredTopics,
      resources: filteredResources,
      completionDeadline: completionDeadline || null
    };
    
    const response = await axios.put(`${API_URL}/edit/${planId}`, learningPlan);
    
    if (response.data.success) {
      alert('Learning plan updated successfully!');
      navigate(`/learning-plan/${planId}`);
    } else {
      setError(response.data.message || 'Error updating learning plan');
    }
  } catch (error) {
    setError('Error updating learning plan');
    console.error('Error updating learning plan:', error);
  }
};
```

#### Delete Learning Plan

**Component**: `LearningPlanDetail.jsx`

```jsx
// Key code snippet for deleting a learning plan
const handleDelete = async () => {
  if (window.confirm('Are you sure you want to delete this learning plan?')) {
    try {
      const response = await axios.delete(`${API_URL}/delete/${planId}`);
      
      if (response.data.success) {
        alert('Learning plan deleted successfully!');
        navigate('/learning-plans');
      } else {
        setError(response.data.message || 'Error deleting learning plan');
      }
    } catch (error) {
      setError('Error deleting learning plan');
      console.error('Error deleting learning plan:', error);
    }
  }
};
```

## Comments

Comments allow users to provide feedback and engage with learning plans.

### Endpoints

| Operation | Endpoint | HTTP Method | Description |
|-----------|----------|-------------|-------------|
| Create | `/api/v1/comments/save` | POST | Add a new comment |
| Read | `/api/v1/comments/learning-plan/{learningPlanId}` | GET | Get all comments for a learning plan |
| Update | `/api/v1/comments/edit/{id}` | PUT | Update an existing comment |
| Delete | `/api/v1/comments/delete/{id}` | DELETE | Delete a comment |

### Frontend Implementation

#### Create Comment

**Component**: `CommentSection.jsx`

```jsx
// Key code snippet for adding a comment
const handleAddComment = async (e) => {
  e.preventDefault();
  
  if (!commentText.trim()) {
    return;
  }
  
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const newComment = {
      learningPlanId,
      userId: user.userId,
      username: user.username,
      text: commentText
    };
    
    const response = await axios.post(`${API_URL}/comments/save`, newComment);
    
    if (response.data.success) {
      setCommentText('');
      // Refresh comments
      fetchComments();
    } else {
      setError(response.data.message || 'Error adding comment');
    }
  } catch (error) {
    setError('Error adding comment');
    console.error('Error adding comment:', error);
  }
};
```

#### Read Comments

**Component**: `CommentSection.jsx`

```jsx
// Key code snippet for fetching comments
const fetchComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/comments/learning-plan/${learningPlanId}`);
    setComments(response.data);
  } catch (error) {
    setError('Error fetching comments');
    console.error('Error fetching comments:', error);
  }
};

useEffect(() => {
  fetchComments();
}, [learningPlanId]);
```

#### Update Comment

**Component**: `CommentSection.jsx`

```jsx
// Key code snippet for editing a comment
const handleEditComment = async (commentId, newText) => {
  try {
    const response = await axios.put(`${API_URL}/comments/edit/${commentId}`, {
      text: newText
    });
    
    if (response.data.success) {
      // Refresh comments
      fetchComments();
    } else {
      setError(response.data.message || 'Error updating comment');
    }
  } catch (error) {
    setError('Error updating comment');
    console.error('Error updating comment:', error);
  }
};
```

#### Delete Comment

**Component**: `CommentSection.jsx`

```jsx
// Key code snippet for deleting a comment
const handleDeleteComment = async (commentId) => {
  if (window.confirm('Are you sure you want to delete this comment?')) {
    try {
      const response = await axios.delete(`${API_URL}/comments/delete/${commentId}`);
      
      if (response.data.success) {
        // Refresh comments
        fetchComments();
      } else {
        setError(response.data.message || 'Error deleting comment');
      }
    } catch (error) {
      setError('Error deleting comment');
      console.error('Error deleting comment:', error);
    }
  }
};
```

## Likes

Likes allow users to show appreciation for learning plans.

### Endpoints

| Operation | Endpoint | HTTP Method | Description |
|-----------|----------|-------------|-------------|
| Create | `/api/v1/likes/save` | POST | Like a learning plan |
| Read | `/api/v1/likes/learning-plan/{learningPlanId}` | GET | Get all likes for a learning plan |
| Read (Check) | `/api/v1/likes/check/user/{userId}/learning-plan/{learningPlanId}` | GET | Check if a user has liked a learning plan |
| Delete | `/api/v1/likes/delete/{id}` | DELETE | Unlike a learning plan |

### Frontend Implementation

#### Create Like (Like a Learning Plan)

**Component**: `LearningPlanDetail.jsx`

```jsx
// Key code snippet for liking a learning plan
const handleLike = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (hasLiked) {
      // Unlike
      const likeToDelete = likes.find(
        like => like.userId === user.userId && like.learningPlanId === learningPlan._id
      );
      
      if (likeToDelete) {
        await axios.delete(`${API_URL}/likes/delete/${likeToDelete._id}`);
        setHasLiked(false);
        setLikes(likes.filter(like => like._id !== likeToDelete._id));
      }
    } else {
      // Like
      const newLike = {
        learningPlanId: learningPlan._id,
        userId: user.userId,
        username: user.username
      };
      
      const response = await axios.post(`${API_URL}/likes/save`, newLike);
      
      if (response.data.success) {
        setHasLiked(true);
        setLikes([...likes, response.data.like]);
      }
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};
```

#### Read Likes

**Component**: `LearningPlanDetail.jsx`

```jsx
// Key code snippet for fetching likes
const fetchLikes = async () => {
  try {
    const response = await axios.get(`${API_URL}/likes/learning-plan/${learningPlan._id}`);
    setLikes(response.data);
    
    // Check if current user has liked
    const user = JSON.parse(localStorage.getItem('user'));
    const userHasLiked = response.data.some(like => like.userId === user.userId);
    setHasLiked(userHasLiked);
  } catch (error) {
    console.error('Error fetching likes:', error);
  }
};

useEffect(() => {
  if (learningPlan) {
    fetchLikes();
  }
}, [learningPlan]);
```

## User Profiles

User profiles store information about users and their preferences.

### Endpoints

| Operation | Endpoint | HTTP Method | Description |
|-----------|----------|-------------|-------------|
| Create/Update | `/api/v1/profiles/save` | POST | Create or update a user profile |
| Read | `/api/v1/profiles/user/{userId}` | GET | Get a user's profile |
| Update | `/api/v1/profiles/edit/{id}` | PUT | Update an existing profile |

### Frontend Implementation

#### Create/Update Profile

**Component**: `EditProfile.jsx`

```jsx
// Key code snippet for creating/updating a profile
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Ensure userId is set
    const updatedProfile = {
      ...profile,
      userId: user.userId
    };
    
    let response;
    
    if (profile._id) {
      // Update existing profile
      response = await axios.put(`${API_URL}/profiles/edit/${profile._id}`, updatedProfile);
    } else {
      // Create new profile
      response = await axios.post(`${API_URL}/profiles/save`, updatedProfile);
    }
    
    if (response.data.success) {
      alert('Profile updated successfully!');
      navigate(`/profile/${user.userId}`);
    } else {
      setError(response.data.message || 'Error updating profile');
    }
  } catch (error) {
    setError('Error updating profile');
    console.error('Error updating profile:', error);
  }
};
```

#### Read Profile

**Component**: `UserProfile.jsx`

```jsx
// Key code snippet for fetching a user profile
const fetchUserProfile = async () => {
  try {
    setLoading(true);
    const response = await axios.get(`${API_URL}/profiles/user/${userId}`);
    setProfile(response.data);
    setLoading(false);
  } catch (error) {
    setError('Error fetching user profile');
    console.error('Error fetching user profile:', error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchUserProfile();
  fetchUserLearningPlans();
}, [userId]);
```

## Follows

Follows allow users to connect with each other and see each other's content.

### Endpoints

| Operation | Endpoint | HTTP Method | Description |
|-----------|----------|-------------|-------------|
| Create | `/api/v1/follows/follow` | POST | Follow a user |
| Read (Followers) | `/api/v1/follows/followers/{userId}` | GET | Get all followers of a user |
| Read (Following) | `/api/v1/follows/following/{userId}` | GET | Get all users a user is following |
| Delete | `/api/v1/follows/unfollow/follower/{followerId}/following/{followingId}` | DELETE | Unfollow a user |

### Frontend Implementation

#### Create Follow (Follow a User)

**Component**: `UserProfile.jsx`

```jsx
// Key code snippet for following a user
const handleFollow = async () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    if (isFollowing) {
      // Unfollow
      await axios.delete(
        `${API_URL}/follows/unfollow/follower/${currentUser.userId}/following/${userId}`
      );
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
    } else {
      // Follow
      await axios.post(`${API_URL}/follows/follow`, {
        followerId: currentUser.userId,
        followerUsername: currentUser.username,
        followingId: userId,
        followingUsername: profile.username || "User"
      });
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
    }
  } catch (error) {
    console.error('Error toggling follow:', error);
  }
};
```

#### Read Follows

**Component**: `FollowersList.jsx`

```jsx
// Key code snippet for fetching followers
const fetchFollowers = async () => {
  try {
    const response = await axios.get(`${API_URL}/follows/followers/${userId}`);
    setFollowers(response.data);
    setLoading(false);
  } catch (error) {
    setError('Error fetching followers');
    console.error('Error fetching followers:', error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchFollowers();
  fetchUsername();
}, [userId]);
```

**Component**: `FollowingList.jsx`

```jsx
// Key code snippet for fetching following users
const fetchFollowing = async () => {
  try {
    const response = await axios.get(`${API_URL}/follows/following/${userId}`);
    setFollowing(response.data);
    setLoading(false);
  } catch (error) {
    setError('Error fetching following users');
    console.error('Error fetching following users:', error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchFollowing();
  fetchUsername();
}, [userId]);
```

## Notifications

Notifications keep users informed about activities related to their content.

### Endpoints

| Operation | Endpoint | HTTP Method | Description |
|-----------|----------|-------------|-------------|
| Create | `/api/v1/notifications/save` | POST | Create a new notification |
| Read | `/api/v1/notifications/user/{userId}` | GET | Get all notifications for a user |
| Update | `/api/v1/notifications/mark-read/{id}` | PUT | Mark a notification as read |
| Delete | `/api/v1/notifications/delete/{id}` | DELETE | Delete a notification |

### Frontend Implementation

#### Read Notifications

**Component**: `Notifications.jsx`

```jsx
// Key code snippet for fetching notifications
const fetchNotifications = async () => {
  try {
    setLoading(true);
    const response = await axios.get(`${API_URL}/notifications/user/${user.userId}`);
    setNotifications(response.data);
    setLoading(false);
  } catch (error) {
    setError('Error fetching notifications');
    console.error('Error fetching notifications:', error);
    setLoading(false);
  }
};

useEffect(() => {
  if (user) {
    fetchNotifications();
  }
}, [user]);
```

#### Update Notification (Mark as Read)

**Component**: `Notifications.jsx`

```jsx
// Key code snippet for marking a notification as read
const handleMarkAsRead = async (notificationId) => {
  try {
    await axios.put(`${API_URL}/notifications/mark-read/${notificationId}`);
    
    // Update local state
    setNotifications(notifications.map(notification => 
      notification._id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};
```

#### Delete Notification

**Component**: `Notifications.jsx`

```jsx
// Key code snippet for deleting a notification
const handleDeleteNotification = async (notificationId) => {
  try {
    await axios.delete(`${API_URL}/notifications/delete/${notificationId}`);
    
    // Update local state
    setNotifications(notifications.filter(notification => notification._id !== notificationId));
  } catch (error) {
    console.error('Error deleting notification:', error);
  }
};
```

---

This guide provides a comprehensive overview of the CRUD operations implemented in the Learning Management System, showing how the frontend React components interact with the backend REST API endpoints. Each section includes the relevant endpoints and code snippets from the frontend implementation.
